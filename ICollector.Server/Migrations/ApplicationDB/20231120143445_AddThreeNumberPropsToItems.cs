using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ICollector.Server.Migrations.ApplicationDB
{
    /// <inheritdoc />
    public partial class AddThreeNumberPropsToItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Number1",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Number2",
                table: "Items",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Number3",
                table: "Items",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number1",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Number2",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Number3",
                table: "Items");
        }
    }
}
