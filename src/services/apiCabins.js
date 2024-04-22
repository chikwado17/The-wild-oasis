import supabase from "../services/supabase";
import { supabaseUrl } from "./supabase";

//function to fetch data in supabase
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

//function to create in supabase
export async function createCabin(newCabin) {
  //checking if the image we want to edit has the right path
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //creating imageName
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //creating image path that will be stored in the cabin database row
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    // .insert([...newCabin])
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  // 2. if successful and no error when creating a new cabin, then upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")

    .upload(imageName, newCabin.image); //passing the image name create and the image that is being uploaded from form (newCabin.image)

  // 3. preventing new cabin from being created if the image was not uploaded successfully, then delete the cabin
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image was not uploaded and the cabin was not created"
    );
  }

  return data;
}

//function to delete in supabase
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}

//function to edit in supabase
export async function editCabin(newCabin, id) {
  //checking if the image we want to edit has the right path
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //creating imageName
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //if it does not have the supabase image path it will create new image to store in the supabase,
  //but if it has the image path it will maintain the previous image path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Edit cabin
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  // 2. if successful and no error when creating a new cabin, then upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")

    .upload(imageName, newCabin.image); //passing the image name create and the image that is being uploaded from form (newCabin.image)

  // 3. preventing new cabin from being created if the image was not uploaded successfully, then delete the cabin
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image was not uploaded and the cabin was not created"
    );
  }

  return data;
}
