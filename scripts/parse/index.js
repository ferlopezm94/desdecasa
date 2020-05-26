const AdmZip = require('adm-zip');
const axios = require('axios');
const parse = require('csv-parse');
const stringify = require('csv-stringify');
const fs = require('fs');
const _ = require('lodash');
const moment = require('moment-timezone');

const {
  caseStateName,
  expectedColumnsAndOrder,
  parseOrigen,
  parseSector,
  parseEntidades,
  parseSexo,
  parseResultado,
} = require('./utils');
const { informationByState } = require('./initialInformationByState');
const DATE = '2020-05-25';
const OUTPUT_ZIP = `${__dirname}/../../src/data/raw/2020-05-25.zip`;
const INPUT_FILE_NAME = `${__dirname}/../../src/data/raw/2020-05-25.csv`;
const OUTPUT_FILE_NAME = `${__dirname}/../../src/data/raw/2020-05-25_parsed.csv`;

const retrieveZipRawData = async () => {
  console.log('retrieveZipRawData');
  const response = await axios.get(
    'http://187.191.75.115/gobmx/salud/datos_abiertos/datos_abiertos_covid19.zip',
    {
      responseType: 'arraybuffer',
    },
  );

  fs.writeFile(OUTPUT_ZIP, response.data, function(error) {
    if (!error) {
      // Parse archive
      const zip = new AdmZip(OUTPUT_ZIP);
      const zipEntries = zip.getEntries(); // An array of ZipEntry records
      console.log('retrieveZipRawData zipEntries', zipEntries.length);

      zipEntries.forEach(zipEntry => {
        console.log('retrieveZipRawData entryName', zipEntry.entryName); // Outputs zip entries information
        const [_, month, day] = DATE.split('-');

        if (zipEntry.entryName.includes(`${month}${day}`)) {
          fs.writeFileSync(INPUT_FILE_NAME, zip.readAsText(zipEntry));
          parseDetailedData();
        } else {
          throw new Error(`Zip data not updated for data: ${DATE}`);
        }
      });
    }
  });
};

const parseDetailedData = () => {
  console.log('create-daily-data-by-state start');

  const parser = parse({ delimiter: ',' });
  let recordsParsed = [];
  let totalRecordsParsed = 0;
  let totalConfirmed = 0;
  let totalNegatives = 0;
  let totalSuspects = 0;
  let totalDeaths = 0;
  let totalActives = 0;

  // Use the readable stream api
  parser.on('readable', () => {
    let record;
    let recordParsed;

    while ((record = parser.read())) {
      if (totalRecordsParsed !== 0) {
        // Extract information
        const [
          fechaDeActualizacion,
          _,
          origen,
          sector,
          entidadDeUnidadMedica,
          sexoDelPaciente,
          entidadDeNacimientoDelPaciente,
          entidadDeResidenciaDelPaciente,
        ] = record;
        const fechaInicioDeSintomas = record[11];
        const fechaDeDefuncion = record[12];
        const resultado = record[30];

        // Create new object based on raw information
        const stateNameMedicalUnit = parseEntidades(parseInt(entidadDeUnidadMedica));
        const stateNamePatientResidence = parseEntidades(parseInt(entidadDeResidenciaDelPaciente));
        const result = parseResultado(parseInt(resultado));
        const isDeath = fechaDeDefuncion !== '9999-99-99';
        const daysDifference = moment(DATE).diff(moment(fechaInicioDeSintomas), 'days');

        recordParsed = {
          fechaDeActualizacion,
          origen: parseOrigen(origen),
          sector: parseSector(sector),
          entidadDeUnidadMedica: stateNameMedicalUnit,
          sexoDelPaciente: parseSexo(sexoDelPaciente),
          entidadDeNacimientoDelPaciente: parseEntidades(parseInt(entidadDeNacimientoDelPaciente)),
          entidadDeResidenciaDelPaciente: stateNamePatientResidence,
          resultado: result,
          fallecido: isDeath,
          fechaDeDefuncion,
          fechaInicioDeSintomas,
          daysDifference,
        };

        // Compute global metrics
        let previous;

        switch (result) {
          case 'POSITIVO':
            informationByState[stateNamePatientResidence].confirmed++;
            totalConfirmed++;

            if (isDeath) {
              informationByState[stateNameMedicalUnit].deaths++;
              totalDeaths++;
            }

            if (daysDifference <= 13) {
              informationByState[stateNamePatientResidence].actives++;
              totalActives++;
            }

            break;
          case 'NEGATIVO':
            informationByState[stateNamePatientResidence].negatives++;
            totalNegatives++;
            break;
          case 'PENDIENTE':
            informationByState[stateNamePatientResidence].suspects++;
            totalSuspects++;
            break;
          default:
            break;
        }

        recordsParsed.push(recordParsed);
      } else {
        if (!_.isEqual(record, expectedColumnsAndOrder)) {
          console.log('retrieved columns', record);
          console.log('expected columns', expectedColumnsAndOrder);
          throw new Error('Column names and order are not as expected.');
        }
      }

      totalRecordsParsed++;
    }
  });

  // Catch any error
  parser.on('error', err => {
    throw new Error(err.message);
  });

  // When we are done, test that the parsed output matched what expected
  parser.on('end', () => {
    totalRecordsParsed--; // To avoid counting the record of column names
    let informationByStateParsed = {};

    // Iterate over each property contained in informationByState
    Object.keys(informationByState).forEach(stateName => {
      switch (stateName) {
        case 'NO APLICA':
        case 'SE IGNORA':
        case 'NO ESPECIFICADO':
        case 'DESCONOCIDO':
          break;
        case 'ESTADOS UNIDOS MEXICANOS':
          informationByStateParsed['Total'] = {
            confirmed: totalConfirmed,
            negatives: totalNegatives,
            suspects: totalSuspects,
            deaths: totalDeaths,
            actives: totalActives,
            tests: totalRecordsParsed,
          };
          break;
        default:
          const stateNameParsed = caseStateName(stateName);
          informationByStateParsed[stateNameParsed] = informationByState[stateName];
          break;
      }
    });

    console.log('informationByStateParsed', informationByStateParsed);
    console.log(`Total records parsed = ${totalRecordsParsed}`);
    console.log(`Total confirmed = ${totalConfirmed}`);
    console.log(`Total actives = ${totalActives}`);
    console.log(`Total suspects = ${totalSuspects}`);
    console.log(`Total deaths = ${totalDeaths}`);
    console.log(`Total negatives = ${totalNegatives}`);

    fs.writeFileSync(
      `${__dirname}/../../src/data/${DATE}.json`,
      JSON.stringify(informationByStateParsed),
    );

    const columns = [
      { key: 'fechaDeActualizacion', header: 'fecha_de_actualizacion' },
      { key: 'origen' },
      { key: 'sector' },
      { key: 'entidadDeUnidadMedica', header: 'entidad_de_unidad_medica' },
      { key: 'sexoDelPaciente', header: 'sexo_del_paciente' },
      { key: 'entidadDeNacimientoDelPaciente', header: 'entidad_de_nacimiento_del_paciente' },
      { key: 'entidadDeResidenciaDelPaciente', header: 'entidad_de_residencia_del_paciente' },
      { key: 'resultado', header: 'resultado' },
      { key: 'fallecido', header: 'fallecido' },
      { key: 'fechaDeDefuncion', header: 'fecha_de_defuncion' },
      { key: 'fechaInicioDeSintomas', header: 'fecha_inicio_de_sintomas' },
      { key: 'daysDifference', header: 'dias_de_diferencia_entre_sintomas_y_hoy' },
    ];
    stringify(
      recordsParsed,
      {
        columns,
        header: true,
      },
      function(err, data) {
        if (err) {
          throw new Error(err);
        } else {
          fs.writeFileSync(OUTPUT_FILE_NAME, data);
        }
      },
    );
  });

  fs.createReadStream(INPUT_FILE_NAME).pipe(parser);
};

retrieveZipRawData();
