const validate = {};


validate.productsData = (req, res, next) => {
    // cek apakah body sesuai dengan yang diinginkan
    const { body } = req;
    const validBody = Object.keys(body).filter(
        (key) => key === "product_name" || key === "price" || key === "description"
    );
    // diinginkan ada ketiga body diatas
    if (!validBody) {
        return res.status(400).json({
            err: "Input Failed",
        });
    }
    next();
};

validate.UsersData = (req, res, next) => {
    // cek apakah body sesuai dengan yang diinginkan
    const { body } = req;
    const validBody = Object.keys(body).filter(
        (key) => key === "email_address" || key === "delivery_address" || key === "mobile_number" || key === "username" || key === "first_name" || key === "last_name" || key === "birth_date"
    );

    if (!validBody) {
        return res.status(400).json({
            err: "Input Failed",
        });
    }
    next();
};


module.exports = validate;