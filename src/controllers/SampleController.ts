import { Request, Response } from 'express'

export default class SampleController {
  index (req: Request, res: Response) {
    console.log("Hi I'm a sample app!!!")

    return res.json({ response: "Hi I'm a sample app!!!" })
  }
}
