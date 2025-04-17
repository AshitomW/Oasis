import { Button } from "@/app/_components/UpdateButton";
import { updateBookingData } from "@/app/_lib/actions";
import { getBooking, getCabin, getSettings } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  // CHANGE

  const { bookingId } = params;
  const { numOfGuests, observations, cabinId } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  // const reservationId = 23;
  // const maxCapacity = 23;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBookingData}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input type="hidden" value={bookingId} name="bookingId" />
        <div className="space-y-2">
          <label htmlFor="numOfGuests">How many guests?</label>
          <select
            name="numOfGuests"
            id="numOfGuests"
            defaultValue={numOfGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button
            label={"Update Reservation"}
            pendingLabel={"Updating Reservation...."}
          />
        </div>
      </form>
    </div>
  );
}
