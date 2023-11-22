﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ICollector.Server.Migrations.ApplicationDB
{
    /// <inheritdoc />
    public partial class AddThreeMultilinePropsToCollections : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Multiline1Name",
                table: "Collections",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Multiline2Name",
                table: "Collections",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Multiline3Name",
                table: "Collections",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Multiline1Name",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "Multiline2Name",
                table: "Collections");

            migrationBuilder.DropColumn(
                name: "Multiline3Name",
                table: "Collections");
        }
    }
}
