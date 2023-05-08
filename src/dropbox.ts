import { Dropbox } from 'dropbox';
import * as fs from 'fs';
export class dropbox {
  private static readonly DB_ACCESS_TOKEN =
    'sl.Bd-Ij0tpB6uI3hq6Bhobx7hnru28AHgRG13VyqNA_LK7R1cPrtwNMjs_q5fGDcYC5Q9crCUWZJ6L8-_7WfdmHNsuQvVn_7fxKElhzC_RFJwGjTPB1J2zfRhYuy-f-wyfyuzJRJb6';
  static async delete(link: string, folder: Folder) {
    const dbx = new Dropbox({ accessToken: dropbox.DB_ACCESS_TOKEN });
    const name = folder + dropbox.extractName(link);
    dbx
      .filesDeleteV2({ path: name })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  static async newUpload(folder: string, source): Promise<string> {
    let entry;
    if (source != null && source.size != 0) {
      entry = await dropbox.upload(
        folder + source.newFilename + source.originalFilename,
        source.filepath,
      );
    } else {
      return undefined;
    }
    return entry;
  }
  private static async upload(name: string, source: string): Promise<string> {
    if (name == null) {
      return null;
    }

    const dbx = new Dropbox({ accessToken: dropbox.DB_ACCESS_TOKEN });
    const words = fs.readFileSync(source);
    await dbx
      .filesUpload({ path: name, contents: words })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
    return await dbx
      .sharingCreateSharedLinkWithSettings({ path: name })
      .then(function (response) {
        console.log(response);
        return response.result.url.replace('https://www.', 'https://dl.');
      });
  }

  private static extractName(name: string): string {
    return name.substring(41, name.length - 5);
  }
}
