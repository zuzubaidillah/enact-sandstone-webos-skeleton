# babel-preset-enact

> This package includes the Babel preset used by Enact.

## Usage in Enact projects created by Enact CLI

The easiest way to use this configuration is with [Enact CLI](https://github.com/enactjs/cli), which includes it by default. You don’t need to install it separately in Enact projects.

## Usage Outside of Enact projects

If you want to use this Babel preset in a project not built with Enact CLI, you can install it with the following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then install babel-preset-enact.

```sh
npm install babel-preset-enact --save-dev
```

Then create a file named `.babelrc` with the following contents in the root folder of your project:

```json
{
  "presets": ["babel-preset-enact"]
}
```

For more information including `.babelrc` setup, please see the [Babel docs](https://babeljs.io/docs/config-files).

## Copyright and License Information

Unless otherwise specified, all content, including all source code files and
documentation files in this repository are:

Copyright (c) 2023 LG Electronics

Unless otherwise specified or set forth in the NOTICE file, all content,
including all source code files and documentation files in this repository are:
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this content except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
