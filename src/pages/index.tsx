import { useEffect, useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ScratchCard from "react-scratchcard-v4";
import Confetti from "react-confetti";
import { OrderSchema } from "@/schemas/orderSchema";
import { appendToSheet, getGifts } from "@/helpers/apis";
import { Loader } from "@/components/Loader";
import { generateRandomNumberFromList } from "@/utils/random";

const styles = {
  label: "block text-black text-sm font-bold pt-4 pb-1",
  field:
    "bg-transparent text-gray-700 focus:shadow-outline border border-gray-300 rounded py-2 px-2 block w-full appearance-none focus:outline-gray-600",
  button:
    "bg-black text-white font-bold py-2 px-4 w-full rounded hover:shadow-md pointer-cursor active:scale-95 transition-transform duration-100 ease-in-out",
  errorMsg: "text-red-500 text-sm",
};

// const appendToSheet = (data: any) => {
//   try {
//     const res = fetch("/api/sheet", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };

const App = (props: any) => {
  const [giftEnabled, setGiftEnabled] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [gift, setGift] = useState({} as { id: number; name: string });
  const [gifts, setGifts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchGifts = async () => {
    setLoading(true);
    const data = await getGifts();
    setGifts(data.gifts.values);
    setTotal(data.total.values[0][0]);
    setLoading(false);
  };

  const filterExistingGifts = (unfilteredGifts: Array<number>) => {
    let filteredGifts: Array<number> = [];
    unfilteredGifts.forEach((index) => {
      if (Number(gifts[index - 1][2]) > 0) {
        filteredGifts.push(index);
      }
    });

    console.log(filteredGifts);

    return filteredGifts;
  };

  const generateGift = (price: number) => {
    // console.log(price);
    // console.log("total", typeof total);
    // console.log("mod", (Number(total) + 1) % 21);
    // console.log("decision", (Number(total) + 1) % 21 === 0);
    // if ((Number(total) + 1) % 15 === 0) {
    //   console.log("gift 15");
    //   return generateRandomNumberFromList(
    //     filterExistingGifts([8, 9, 10, 11, 12, 13])
    //   );
    // } else if (price < 15 * 1000) {
    //   console.log("0 < gift < 15");
    //   return generateRandomNumberFromList(filterExistingGifts([1, 6, 7]));
    // } else if (price < 30 * 1000) {
    //   console.log("15 < gift < 30");
    //   return generateRandomNumberFromList(filterExistingGifts([1, 2, 3, 6, 7]));
    // } else {
    //   console.log("gift > 30");
    //   return generateRandomNumberFromList(
    //     filterExistingGifts([1, 2, 3, 4, 5, 6, 7])
    //   );
    // }

    if ((Number(total) + 1) % 20 === 0) {
      console.log("gift 15");
      return generateRandomNumberFromList(filterExistingGifts([8, 9]));
    } else if (price >= 500 && price <= 1000) {
      console.log("500 < gift < 1000");
      return generateRandomNumberFromList(filterExistingGifts([1, 2]));
    } else if (price > 1000 && price <= 1500) {
      console.log("1001 < gift < 1500");
      return generateRandomNumberFromList(filterExistingGifts([2, 3, 4, 6]));
    } else if (price > 1500 && price <= 1800) {
      console.log("1501 < gift < 1800");
      return generateRandomNumberFromList(filterExistingGifts([3, 4, 5, 6, 7]));
    } else if (price > 1800 && price <= 2200) {
      console.log("1801 < gift < 2200");
      return generateRandomNumberFromList(filterExistingGifts([5, 7]));
    } else if (price > 2800) {
      console.log("2800 < gift");
      return generateRandomNumberFromList(filterExistingGifts([8, 9]));
    } else {
      console.log('gift not valid');
      return -1;
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  useEffect(() => console.log(gifts, total, [gifts, total]));

  return (
    <main className="flex flex-col items-center justify-start p-4 min-h-full">
      <div>
        <Image
          src="/assets/arihant.png"
          alt="arihant logo"
          height={100}
          width={200}
          priority
        />
      </div>
      <div>
        <Formik
          initialValues={{
            invoice: "",
            price: props.price,
            name: "",
            phone: "",
            email: "",
          }}
          onSubmit={(values) => {
            const gift = generateGift(values.price);
            setGift({ id: gift - 1, name: gifts[gift - 1][1] });
            setGiftEnabled(
              appendToSheet({
                ...values,
                gift: gifts[gift - 1][1],
                index: (Number(gifts[gift - 1][0]) + 1).toString(),
                count: (Number(gifts[gift - 1][2]) - 1).toString(),
              })
            );
          }}
          validationSchema={OrderSchema}
        >
          <Form>
            <label className={styles.label} htmlFor="invoice">
              Customer Number
            </label>
            <Field
              className={styles.field}
              id="invoice"
              name="invoice"
              disabled
              value={(Number(total) + 1).toString()}
            />
            <ErrorMessage
              component="a"
              className={styles.errorMsg}
              name="invoice"
            />

            <label className={styles.label} htmlFor="price">
              Order Total
            </label>
            <Field
              className={styles.field}
              id="price"
              name="price"
              disabled={props.price}
            />
            <ErrorMessage
              component="a"
              className={styles.errorMsg}
              name="price"
            />

            <label className={styles.label} htmlFor="name">
              Full Name
            </label>
            <Field className={styles.field} id="name" name="name" />
            <ErrorMessage
              component="a"
              className={styles.errorMsg}
              name="name"
            />

            <label className={styles.label} htmlFor="phone">
              Phone Number
            </label>
            <Field className={styles.field} id="phone" name="phone" />
            <ErrorMessage
              component="a"
              className={styles.errorMsg}
              name="phone"
            />

            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
            <Field className={styles.field} id="email" name="email" />
            <ErrorMessage
              component="a"
              className={styles.errorMsg}
              name="email"
            />

            <div className="mt-8">
              <button type="submit" className={styles.button}>
                Claim Gift!
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      <div>
        {giftEnabled && (
          <div
            className={`fixed flex-col gap-8 inset-0 min-h-full min-w-screen items-center justify-center flex bg-white`}
          >
            {/* <h1 className="mb-4 ml-1 text-2xl uppercase font-bold whitespace-nowrap">
              🎉 Scratch & Win A Gift 🎉
            </h1> */}
            <ScratchCard
              width={400}
              height={502}
              image="/assets/cover.jpg"
              finishPercent={30}
              brushSize={40}
              onComplete={() => setConfetti(true)}
            >
              {/* <Image
                src="/assets/arihant.png"
                alt="gift"
                width={400}
                height={400}
              /> */}
              <div className="w-full h-full flex justify-center items-center">
                {/* <h1 className="text-xl">{gift}</h1> */}
                <Image
                  style={{ width: "auto", height: "auto" }}
                  src={`/assets/images/${gift.id}.png`}
                  width={400}
                  height={400}
                  alt={gift.name}
                />
              </div>
            </ScratchCard>
            {confetti && (
              <button
                type="button"
                className={`${styles.button} !w-fit`}
                onClick={() =>
                  window.open(
                    "https://maps.app.goo.gl/Dz7FQBAiVQLRmiN59?g_st=ic"
                  )
                }
              >
                Submit Your Review
              </button>
            )}
            {confetti && (
              <div className="min-w-screen">
                <Confetti />
              </div>
            )}
          </div>
        )}
      </div>
      {loading && <Loader />}
    </main>
  );
};

export async function getServerSideProps(ctx: any) {
  const { invoice, price } = ctx.query;

  if (invoice && price) {
    return {
      props: {
        invoice,
        price,
      },
    };
  }

  return { props: {} };
}

export default App;
