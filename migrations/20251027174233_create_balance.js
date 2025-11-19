exports.up = function (knex) {
  return knex.schema.createTable("balance", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.decimal("total_income", 12, 2).defaultTo(0);
    table.decimal("total_expense", 12, 2).defaultTo(0);
    table.decimal("balance", 12, 2).defaultTo(0);
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("balance");
};
