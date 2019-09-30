import { Container, decorate, injectable } from "inversify"
import { buildProviderModule } from "inversify-binding-decorators"
import { Controller } from "tsoa"

import { module as usersModule } from "./Features/Users/module"

let iocContainer = new Container()

iocContainer.load(usersModule)

// Necessary to inject 'tsoa'-Controllers
decorate(injectable(), Controller)
iocContainer.load(buildProviderModule())

export { iocContainer }
