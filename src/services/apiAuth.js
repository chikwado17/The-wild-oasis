import supabase, { supabaseUrl } from "./supabase";

export const signUp = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

//creating login from supabase
export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

//Fetching current logged in user
export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  //if there is no current user from the local-storage session data
  if (!session.session) return null;

  //fetch the current user data
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
};

//Function to logout from supabase Authentication
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

//function to update user details
export const updateCurrentUser = async ({ password, fullName, avatar }) => {
  // 1. Update password Or fullName
  let updateData;
  if (password) {
    updateData = { password };
  }
  if (fullName) {
    updateData = { data: { fullName } };
  }
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;
  //End of step 1

  // 2. Upload the avatar image (if there is an avatar specified in the user update input form)
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) {
    throw new Error(storageError.message);
  }
  //End of step 2

  //https://figmrhmkgvvrwmybzhmf.supabase.co/storage/v1/object/public/avatars/nworie.jpg

  //3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) {
    throw new Error(error2.message);
  }

  return updatedUser;
};
