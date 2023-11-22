using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ICollector.Server.Migrations.ApplicationDB
{
    /// <inheritdoc />
    public partial class AddThreeTextPropsToCollections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Text1Name",
                table: "Collections",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Text2Name",
                table: "Collections",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Text3Name",
                table: "Collections",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Text1Name",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "Text2Name",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "Text3Name",
                table: "Collections");
        }
    }
}
