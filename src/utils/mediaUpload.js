import { createClient } from "@supabase/supabase-js";

// Fetch environment variables using import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default function uploadFile(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file provided");
      return;
    }

    const timestamp = new Date().getTime();
    const fileName = timestamp + "-" + file.name;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        upsert: false,
        cacheControl: 3600,
      })
      .then(() => {
        const url = supabase.storage
          .from("images")
          .getPublicUrl(fileName).data.publicUrl;
        resolve(url);
      })
      .catch(() => {
        reject("Failed to upload file");
      });
  });
}