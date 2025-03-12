import server from "./server.js";

// const { sequelize } = require("./models/db_orm.js");

// (async () => {
//   try {
//     await sequelize
//       .sync({ force: false })
//       .then(() => {
//         console.log("Mysql2 connected!");
//         server.listen(port_server, host_server, () => {
//           if (process.env.SERVER_PORT_OUTER) {
//             console.log(`Server started on host:port - ${host_server}:${process.env.SERVER_PORT_OUTER}`);
//           } else {
//             console.log(`Server started on host:port - ${host_server}:${port_server}`);
//           }
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// })();

// process.on("SIGINT", async () => {
//   await sequelize.close();
//   console.log("DB connection closed. Server connection closed. Bye!");
//   process.exit(0);
// });
