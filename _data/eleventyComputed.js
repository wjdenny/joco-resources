import fs from "fs";

const dataPath = "_data/resources";
const files = fs.readdirSync(dataPath);

// files
// .map((file => ({
//     name: file,
//     lastModifiedDate: fs.statSync(`${dataPath}/${file}`).mtime.getTime()
// })))
// .sort((a, b) => b.time - a.time)
// .map((file) => file.name.split(".")[0])
// .forEach((name) => (sorted[name] = object[name]));

export default {
    resources: (data) => {
        const resources = data.resources;

        for (const key in resources) {
            // compute path to the data file that the data comes from
            resources[key].dataFile = `${dataPath}/${key}.yaml`;

            // compute link to GitHub edit page
            resources[key].gitHubLink = `${data.github}/blob/master/_data/${key}.yaml`

            // compute last modified date
            resources[key].lastModifiedDate = fs.statSync(resources[key].dataFile).mtime
        }
        
        return resources;
    }
}