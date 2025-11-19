exports.up = function (knex) {
  return knex.schema.createTable("expenses", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("expense_category_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("expense_categories")
      .onDelete("CASCADE");
    table.decimal("amount", 12, 2).notNullable();
    table.text("note");
    table.date("date").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("expenses");
};
