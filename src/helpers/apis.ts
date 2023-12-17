const appendToSheet = (data: any) => {
  try {
    const res = fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getGifts = () => {
    try {
        const res = fetch ("/api/gifts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return res.then((res) => res.json());
    } catch (err) {
        console.log(err);
        return false;
    }
}

export { appendToSheet, getGifts };
