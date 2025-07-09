# MyParcel JS Plugin Development Kit

[![Latest version](https://img.shields.io/github/v/release/myparcelnl/js-pdk)](https://github.com/myparcelnl/js-pdk/releases/latest)
[![NPM downloads](https://img.shields.io/npm/dm/@myparcel-pdk/admin)](https://www.npmjs.com/)
[![Code coverage](https://img.shields.io/codecov/c/github/myparcelnl/js-pdk)](https://codecov.io/gh/myparcelnl/js-pdk)
![License](https://img.shields.io/github/license/myparcelnl/js-pdk)
[![Chat with us](https://img.shields.io/badge/Slack-Chat%20with%20us-white?logo=slack&labelColor=4a154b)](https://join.slack.com/t/myparcel-dev/shared_invite/enQtNDkyNTg3NzA1MjM4LTM0Y2IzNmZlY2NkOWFlNTIyODY5YjFmNGQyYzZjYmQzMzliNDBjYzBkOGMwYzA0ZDYzNmM1NzAzNDY1ZjEzOTM)

The MyParcel PDK (Plugin Development Kit) is meant for developing entire plugins on E-Commerce platforms. If you're just looking to connect to our API without creating an entire plugin, you should check out our php [SDK].

## Requirements

- [Node.js](https://nodejs.org/en/) (v16 or higher)

## Documentation

For examples, guides and in-depth information, visit our [Plugin Development Kit (PDK) documentation].

## Support

Create an issue or contact us via our [Developer Portal contact page].

## Contributing

View our [contribution guidelines] for information on how to contribute to the PDK.

### Prerequisites

- Node 18
- Yarn
- Docker

## Packages

This project contains multiple npm packages. Install them with [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.js.org/).

### Backend

#### @myparcel-pdk/admin

This is the main package for the admin interface. It's able to

#### @myparcel-pdk/admin-preset-default

This package contains default components for [@myparcel-pdk/admin](#myparcel-pdkadmin).

#### @myparcel-pdk/admin-preset-bootstrap4

This package contains components for [@myparcel-pdk/admin](#myparcel-pdkadmin) that use the [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) CSS framework.

#### @myparcel-pdk/admin-preset-dashicons

This package contains components for [@myparcel-pdk/admin](#myparcel-pdkadmin) that use the [Dashicons](https://developer.wordpress.org/resource/dashicons/) icon library.

#### @myparcel-pdk/admin-preset-fontawesome

This package contains components for [@myparcel-pdk/admin](#myparcel-pdkadmin) that use the [Font Awesome](https://fontawesome.com/) icon library.

#### @myparcel-pdk/admin-component-tests

If you're making your own components for [@myparcel-pdk/admin](#myparcel-pdkadmin), you can use this package to test them.

#### @myparcel-pdk/app-builder

This is a CLI tool to build an app using [@myparcel-pdk/admin](#myparcel-pdkadmin).

### Frontend

#### @myparcel-pdk/checkout

This is the main package for the checkout and is meant to work with [MyParcel Delivery Options](https://github.com/myparcelnl/delivery-options) package.

## Contributing

See the [Developer Guide for contributing to MyParcel repositories](https://github.com/myparcelnl/developer/blob/main/DEVELOPERS.md).
