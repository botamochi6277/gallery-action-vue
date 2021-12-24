const fs = require('fs');
const path = require('path');
const fse = require('fs-extra')

// https://qiita.com/shisama/items/affb219514eb1166198e
const showFiles = (dirpath, callback) => {
    fs.readdir(dirpath, { withFileTypes: true }, (err, dirents) => {
        if (err) {
            console.error(err);
            return;
        }

        for (const dirent of dirents) {
            const fp = path.join(dirpath, dirent.name);
            if (dirent.isDirectory()) {
                showFiles(fp, callback);
            } else {
                callback(fp);
            }
        }
    });
}

const assignImages = async (dirpath, output_path) => {
    fs.readdir(dirpath, { withFileTypes: true }, (err, dirents) => {
        let images = new Array();
        let idx = 0;
        if (err) {
            console.error(err);
            return;
        }

        for (const dirent of dirents) {
            const fp = path.join(dirpath, dirent.name);
            if (dirent.isDirectory()) {
                // showFiles(fp, callback);
            } else {
                ext = path.basename(fp).split(".")[1]
                if ((ext == "jpg") || (ext == "png") || (ext == "jpeg") || (ext == "svg")) {
                    ss = fp.split("/")
                    cat = ss[ss.length - 2]

                    images.push(
                        {
                            "index": idx,
                            "name": path.basename(fp).split(".")[0],
                            "src": fp,
                            "category": cat
                        }
                    );
                    idx += 1;
                }
            }
        }
        // console.log(images)
        s = JSON.stringify({ "images": images });
        fs.writeFileSync(output_path, s);
    });
}


output_name = "output.json";
if (process.argv.length >= 4) {
    output_name = process.argv[3];
}

// copy
if (process.env.GITHUB_WORKSPACE) {
    fse.copySync("dist/*", process.env.GITHUB_WORKSPACE)
}

// https://note.com/tably/n/n46041458d6b3
// move to github workspace
if (process.env.GITHUB_WORKSPACE) {
    const workspace = process.env.GITHUB_WORKSPACE;
    // const targetDir = process.env.INPUT_TARGET_DIRECTORY;
    // process.env.GITHUB_WORKSPACE = `${workspace}/${targetDir}`;
    process.chdir(process.env.GITHUB_WORKSPACE);
}

assignImages(process.argv[2], output_name);

