import { Command } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "list|get|add|remove")
  .option("-i, --id <id>")
  .option("-n, --name <name>")
  .option("-e, --email <email>")
  .option("-p, --phone <phone>");

program.parse(process.argv);
const opts = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await listContacts());
      break;
    case "get":
      console.log(await getContactById(id));
      break;
    case "add":
      console.log(await addContact(name, email, phone));
      break;
    case "remove":
      console.log(await removeContact(id));
      break;
    default:
      console.log("Unknown action. Use: list|get|add|remove");
  }
}

invokeAction(opts);
