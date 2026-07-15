const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  });