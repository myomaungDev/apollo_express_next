import { createWriteStream } from "fs";
import { parse, join } from "path";
import { URL } from "../../config";
import { v4 } from "uuid";
export default {
  Query: {
    Info: () => "Im am file Uploader",
  },
  Mutation: {
    UploadFile: async (_, { file }, context, info) => {
      try {
        let { filename, createReadStream } = await file;

        let steam = createReadStream();

        let name = v4() + "_" + filename;
        let serverFile = join(__dirname, "..", "..", "..", "uploads", name);
        let writeSteam = createWriteStream(serverFile);
        await steam.pipe(writeSteam);
        serverFile = join(URL, "uploads", name);
        return serverFile;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};
