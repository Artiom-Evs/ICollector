using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ICollector.Server.Migrations.ApplicationDB
{
    /// <inheritdoc />
    public partial class AddThreeMultilinePropsToItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Multiline1",
                table: "Items",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Multiline2",
                table: "Items",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Multiline3",
                table: "Items",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Multiline1",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Multiline2",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Multiline3",
                table: "Items");
        }
    }
}
