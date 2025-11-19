exports.up = async function (knex) {
  await knex("income_categories").insert([
    { name: "Salary", user_id: null },
    { name: "Bonus", user_id: null },
    { name: "Freelance", user_id: null },
  ]);

  await knex("expense_categories").insert([
    { name: "Rent", user_id: null },
    { name: "Utilities", user_id: null },
    { name: "Groceries", user_id: null },
  ]);
};

exports.down = async function (knex) {
  await knex("income_categories").whereNull("user_id").del();
  await knex("expense_categories").whereNull("user_id").del();
};
