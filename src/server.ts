import "dotenv/config";
import { app } from "./app.js";

const portValue = process.env.PORT ?? "3001";
const PORT = Number(portValue);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
