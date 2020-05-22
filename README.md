# DesdeCasa (StayAtHome)

DesdeCasa is a website that displays the most relevant information (daily and historical) related to COVID-19 in Mexico, both national and statal.

The objective is to have an easy to use website for people to share the information and raise awareness about the magnitude of the problem.

## Data

### Input

The data shared by [The Health Department](https://www.gob.mx/salud) of Mexico's government is used to display the information in the website. It's published as Open Data and you can find it [here](https://datos.gob.mx/busca/dataset/informacion-referente-a-casos-covid-19-en-mexico).

The data is downloaded and processed. You can find both formats [here](https://github.com/ferlopezm94/desdecasa/tree/master/src/data).

### Output

The information shown in the website is the following:

- Confirmed cases
- Deaths
- Suspect cases
- Active cases
- Tests made

All but tests made are shared for both national and statal level. The information is updated daily at around 20:00 hrs and the users can view the information in a daily or historical basis using some charts.

## Getting started

### Requirements

Make sure the following tools are installed in your system:

- [Node v12.X.X](https://nodejs.org/en/download/)
- [Yarn v1.21.X](https://yarnpkg.com/en/docs/install)

### Installation

Clone the GitHub repository and user `yarn` to install the dependencies.

```
$ git clone https://github.com/ferlopezm94/desdecasa.git
$ cd desdecasa
$ yarn install
```

## Development

### Local

```
$ yarn develop
```

Now you're ready to view the website, open a browser and visit `localhost:8000`. You can start making some changes and each one will trigger an update to the website.

### Build

To create a production build simply run:

```
$ yarn build
```

Gatsby will perform an optimized production build for your site, generating static HTML and per-route JavaScript code bundles. The build will be in the `public` folder.

To serve the production build locally run:

```
$ yarn serve
```

Gatsby starts a local HTML server for testing your build site at localhost:9000.

## Directory layout

```
.
├── public/                 <-- Static files optimized for a production build
├── scripts/                <-- Logic to parse the raw COVID-19 data and create the JSON formats used in the website
├── source/                 <-- Source code for our website
```

## Contributions

Open an issue or add a Bug or Feature request, or send me a DM in [twitter](https://twitter.com/ferlopezm94) and we can talk.
