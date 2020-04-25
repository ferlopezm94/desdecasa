const fs = require('fs');
const parse = require('csv-parse');
const stringify = require('csv-stringify');
const moment = require('moment-timezone');

const {
  parseOrigen,
  parseSector,
  parseEntidades,
  parseSexo,
  parseResultado,
} = require('./utilsDetailedData');
const { informationByState } = require('./initial');
const inputFileName = `${__dirname}/../src/data/detailed/2020-04-23.csv`;
const outFileName = `${__dirname}/../src/data/detailed/2020-04-23_parsed.csv`;
const STATE_DATA_FILENAME = 'src/data';
const DATE = '2020-04-23';

const titleCase = title => {
  let splitTitle;

  switch (title) {
    case 'COAHUILA DE ZARAGOZA':
      return 'Coahuila';
    case 'CIUDAD DE MÉXICO':
      return 'Ciudad de México';
    case 'MICHOACÁN DE OCAMPO':
      return 'Michoacán';
    case 'VERACRUZ DE IGNACIO DE LA LLAVE':
      return 'Veracruz';
    default:
      splitTitle = title.toLowerCase().split(' ');
      break;
  }

  for (let i = 0; i < splitTitle.length; i++) {
    splitTitle[i] = splitTitle[i].charAt(0).toUpperCase() + splitTitle[i].substring(1);
  }

  return splitTitle.join(' ');
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

    // "FECHA_ACTUALIZACION","ID_REGISTRO","ORIGEN","SECTOR","ENTIDAD_UM","SEXO","ENTIDAD_NAC","ENTIDAD_RES","MUNICIPIO_RES","TIPO_PACIENTE","FECHA_INGRESO","FECHA_SINTOMAS","FECHA_DEF","INTUBADO","NEUMONIA","EDAD","NACIONALIDAD","EMBARAZO","HABLA_LENGUA_INDIG","DIABETES","EPOC","ASMA","INMUSUPR","HIPERTENSION","OTRA_COM","CARDIOVASCULAR","OBESIDAD","RENAL_CRONICA","TABAQUISMO","OTRO_CASO","RESULTADO","MIGRANTE","PAIS_NACIONALIDAD","PAIS_ORIGEN","UCI"

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
        const stateName = parseEntidades(parseInt(entidadDeResidenciaDelPaciente));
        const result = parseResultado(parseInt(resultado));
        const isDeath = fechaDeDefuncion !== '9999-99-99';
        const daysDifference = moment(DATE).diff(moment(fechaInicioDeSintomas), 'days');

        recordParsed = {
          fechaDeActualizacion,
          origen: parseOrigen(origen),
          sector: parseSector(sector),
          entidadDeUnidadMedica: parseEntidades(parseInt(entidadDeUnidadMedica)),
          sexoDelPaciente: parseSexo(sexoDelPaciente),
          entidadDeNacimientoDelPaciente: parseEntidades(parseInt(entidadDeNacimientoDelPaciente)),
          entidadDeResidenciaDelPaciente: stateName,
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
            previous = informationByState[stateName].confirmed || 0;
            informationByState[stateName].confirmed = previous + 1;
            totalConfirmed++;

            if (isDeath) {
              previous = informationByState[stateNameMedicalUnit].deaths || 0;
              informationByState[stateNameMedicalUnit].deaths = previous + 1;
              totalDeaths++;
            }

            if (daysDifference <= 13) {
              previous = informationByState[stateName].actives || 0;
              informationByState[stateName].actives = previous + 1;
              totalActives++;
            }

            break;
          case 'NEGATIVO':
            previous = informationByState[stateName].negatives || 0;
            informationByState[stateName].negatives = previous + 1;
            totalNegatives++;
            break;
          case 'PENDIENTE':
            previous = informationByState[stateName].suspects || 0;
            informationByState[stateName].suspects = previous + 1;
            totalSuspects++;
            break;
          default:
            break;
        }

        recordsParsed.push(recordParsed);
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
    let informationByStateParsed = {};

    Object.keys(informationByState).forEach(stateName => {
      console.log('state', stateName, titleCase(stateName));

      switch (stateName) {
        case 'ESTADOS UNIDOS MEXICANOS':
          informationByStateParsed['Total'] = {
            confirmed: totalConfirmed,
            negatives: totalNegatives,
            suspects: totalSuspects,
            deaths: totalDeaths,
            actives: totalActives,
          };
          break;
        case 'NO APLICA':
        case 'SE IGNORA':
        case 'NO ESPECIFICADO':
        case 'DESCONOCIDO':
          break;
        default:
          const stateNameParsed = titleCase(stateName);
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
      `${__dirname}/../${STATE_DATA_FILENAME}/${DATE}.json`,
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
          // console.log('data', data);
          // console.log('informationByState', informationByState);
          // console.log('totalConfirmed', totalConfirmed);
          fs.writeFileSync(outFileName, data);
        }
      },
    );
  });

  fs.createReadStream(inputFileName).pipe(parser);
};

parseDetailedData();
