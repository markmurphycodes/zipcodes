import fs from "fs";
import path from "path";

const r = 6371; // kilometers

/*
 * Probably pretty hacky, setting up a hashmap from CSV file
 */
const coordinates = {};
const relativePath = "data/zipcodes.csv";
const filePath = path.resolve("./public", relativePath);
let f = fs.readFileSync(filePath, { encoding: "utf-8" });

f = f.split("\n").slice(1);

f.forEach((coord) => {
  let tmp = coord.split(",");
  coordinates[tmp[0]] = [parseFloat(tmp[1]), parseFloat(tmp[2])];
});

const radians = (n) => {
  return (n * Math.PI) / 180;
};

/*
 * Haversine algo for straight-line distance on a sphere
 * Formula from https://www.igismap.com/haversine-formula-calculate-geographic-distance-earth/
 */
const haversine = (lat1, lon1, lat2, lon2) => {
  let dLat = radians(lat2 - lat1);
  let dLon = radians(lon2 - lon1);

  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(radians(lat1)) *
      Math.cos(radians(lat2)) *
      Math.pow(Math.sin(dLon / 2), 2);

  let c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;

  let d = (r * c) / 1.60934;

  return d;
};

export default function calculateAPI(req, res) {
  // Only allowing POST requests to this endpoint
  switch (req.method) {
    case "POST":
      let invalid = [];
      let valid = [];

      try {
        /*
         * Only known coordinates should be accepted
         */
        req.body.stops.forEach((stop) => {
          if (coordinates[stop]) {
            valid.push(coordinates[stop]);
          } else {
            stop.length ? invalid.push(stop) : null;
          }
        });

        if (invalid.length || valid.length < 2) {
          res.status(200).json({ invalid: invalid });
        }

        let retval = 0;

        // Grab distances here

        for (let i = 0; i < valid.length - 1; i++) {
          let dist = haversine(
            valid[i][0],
            valid[i][1],
            valid[i + 1][0],
            valid[i + 1][1]
          );

          retval += dist;
        }

        res.status(200).json({ valid: valid, totalDistance: retval });
      } catch {
        res.status(200).send({ invalid: [] });
      }

      break;

    default:
      res.status(405).send(`${req.method} not allowed`);
  }
}
