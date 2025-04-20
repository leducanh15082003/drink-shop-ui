// lib/uploadFile.ts
import { supabase } from "./supabase"; // đảm bảo bạn đã init Supabase client

export const uploadFile = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("drinkshop")
    .upload(fileName, file);

  if (error) throw error;

  const { publicUrl } = supabase.storage
    .from("drinkshop")
    .getPublicUrl(data.path).data;

  return publicUrl;
};
