import { Controller, Accepts, Get, Post, TypeJson, Request, Response } from '@natural/decorators'

// Registered route: /test
@Controller('test')
class TestGet {
  // Without path
  // Registered route: /test/
  @Get()
  main () {
    // Return string, automatic detected by Natural
    return 'Welcome'
  }

  // With path
  // Registered route: /test/simple
  @Get('simple')
  getSimple () {
    // Return string
    return 'Simple Main'
  }

  // With path, with params
  // Registered route: /test/simple/:id
  @Get('simple/:id')
  // With arguments: id
  @Accepts('id')
  // Return type: json (application/json)
  @TypeJson()
  getSimpleId (id) {
    return { id }
  }

  // With path, with params
  @Get('validator/:id')
  // With arguments with validator: id (only type number)
  @Accepts({ name: 'id', type: 'number' })
  // Return type: json (application/json)
  @TypeJson()
  getIdWithValidator (id) {
    return { id, type: typeof id }
  }

  @Get('upload')
  @Accepts(Response)
  getUploadHtml (res) {
    res.type('text/html')

    return `
    <html>
      <head></head>
      <body>
        <form method="POST" enctype="multipart/form-data">
          <input type="file" name="upload" multiple><br />
          <input type="text" name="textfield[]"><br />
          <input type="text" name="textfield[]"><br />
          <input type="text" name="otextfield"><br />
          <input type="file" name="filefield" multiple><br />
          <input type="submit">
        </form>\
      </body>
    </html>
    `
  }

  @Post('upload')
  @Accepts(Request, Response)
  uploadFile (req, res) {
    const { createReadStream } = require('fs')
    const file = req.files.upload[0]
    res.type(file.mimeType)
    res.pipe(createReadStream(file.filepath))
  }
}

export default TestGet
