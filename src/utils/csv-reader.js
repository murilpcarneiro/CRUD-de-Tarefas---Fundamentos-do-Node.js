import { parse } from "csv-parse";
import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const csv_path = `${__dirname}/../csv_import/fs_read.csv`;
const API_URL = "http://localhost:3333";

const processFile = async () => {
  const records = [];
  const parser = fs.createReadStream(csv_path).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  );
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

const importTasksToDatabase = async (tasks) => {
  for (const task of tasks) {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
        }),
      });

      if (response.ok) {
        console.log(`✓ Task criada: ${task.title}`);
      } else {
        console.error(
          `✗ Erro ao criar task: ${task.title} - Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error(`✗ Erro na requisição para ${task.title}:`, error.message);
    }
  }
};

(async () => {
  try {
    console.log("📥 Iniciando leitura do CSV...");
    const records = await processFile();
    console.log(`✓ ${records.length} tasks lidas do CSV\n`);

    console.log("📤 Importando tasks para o banco de dados...");
    await importTasksToDatabase(records);

    console.log("\n✅ Importação concluída!");
  } catch (error) {
    console.error("❌ Erro durante a importação:", error);
  }
})();
