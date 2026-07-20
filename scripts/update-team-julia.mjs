// Script pontual: substituir Gabriela Montezi por Júlia Ribeiro em team_members.
// Uso: node scripts/update-team-julia.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const idx = line.indexOf("=");
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      return [key, value];
    })
);

const url = env.VITE_SUPABASE_URL;
const serviceKey = env.VITE_SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Faltando VITE_SUPABASE_URL ou VITE_SUPABASE_SERVICE_ROLE_KEY em .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

// 1) Verifica se a Gabriela existe
const { data: current, error: readErr } = await supabase
  .from("team_members")
  .select("id, name, role, image_url")
  .eq("name", "Gabriela Montezi")
  .maybeSingle();

if (readErr) {
  console.error("Erro ao ler:", readErr);
  process.exit(1);
}
if (!current) {
  console.log("Nenhum registro 'Gabriela Montezi' encontrado. Nada a fazer.");
  process.exit(0);
}
console.log("Registro atual:", current);

// 2) Atualiza para Júlia Ribeiro (limpa bio e image_url — resolução da foto é local)
const { data: updated, error: updErr } = await supabase
  .from("team_members")
  .update({
    name: "Júlia Ribeiro",
    role: "Estrategista de Redes Sociais",
    bio: null,
    image_url: null,
  })
  .eq("id", current.id)
  .select()
  .single();

if (updErr) {
  console.error("Erro ao atualizar:", updErr);
  process.exit(1);
}
console.log("✓ Atualizado:", updated);
