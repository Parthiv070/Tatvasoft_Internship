using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mission.Entities.Migrations
{
    /// <inheritdoc />
    public partial class SyncModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "email_address", "first_name", "last_name", "password", "phone_number" },
                values: new object[] { "parthivchudasama@gmail.com", "Parthiv", "Chudasama", "Parthiv@123", "9512065400" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "id",
                keyValue: 1,
                columns: new[] { "email_address", "first_name", "last_name", "password", "phone_number" },
                values: new object[] { "admin@tatvasoft.com", "Tatva", "Admin", "Tatva@123", "9876543210" });
        }
    }
}
