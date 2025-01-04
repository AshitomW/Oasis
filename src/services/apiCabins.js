import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error("Error");
    throw new Error("Cabins Could Not Be Loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("Cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;

  // Uploading
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Rollback on error : Delete cabin on  error

  if (storageError) {
    console.error(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin Image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
