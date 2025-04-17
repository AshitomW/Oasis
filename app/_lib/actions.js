"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import {
  getBookings,
  deleteBooking,
  updateGuest,
  updateBooking,
  createBooking,
} from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function updateProfile(formData) {
  // Check authorization & authentication
  const session = await auth();
  if (!session) throw new Error("You Must Be Logged In !");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  //Then conisder all inputs as unsafe

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Provide Valid ID");
  }

  const updatedProfile = {
    nationality,
    countryFlag,
    nationalID,
  };

  await updateGuest(session.user.guestId, updatedProfile);

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  //await new Promise((res) => setTimeout(res, 2000));

  const session = await auth();
  if (!session) throw new Error("You Must Be Logged In !");

  const guestsBookings = await getBookings(session.user.guestId);

  const guestBookingsId = guestsBookings.map((booking) => booking.id);

  if (!guestBookingsId.includes(bookingId)) {
    throw new Error("Not Your Booking ! You Wont Be allowed To delete it!");
  }

  await deleteBooking(bookingId);
  // revalidateTag based on a cache tag
  revalidatePath("/account/reservations");
}

export async function updateBookingData(formData) {
  const session = await auth();
  if (!session) throw new Error("You Must Be Logged In !");

  const bookingId = Number(formData.get("bookingId"));

  const guestsBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestsBookings.map((booking) => booking.id);
  if (!guestBookingsId.includes(bookingId)) {
    throw new Error("Not Your Booking ! You Wont Be allowed To delete it!");
  }

  const updatedData = {
    numOfGuests: Number(formData.get("numOfGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  console.log(updatedData);

  await updateBooking(bookingId, updatedData);
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You Must Be Logged In !");

  const reservation = {
    guestId: session.user.guestId,
    ...bookingData,
    numOfGuests: Number(formData.get("numOfGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  await createBooking(reservation);
  revalidatePath(`/cabins/${bookingData.cabinId}`); // also clears datacache / full router cache for statics
  redirect("/cabins/thankyou");
}
