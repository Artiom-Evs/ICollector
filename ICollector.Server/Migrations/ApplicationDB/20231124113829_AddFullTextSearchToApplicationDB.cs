using Microsoft.EntityFrameworkCore.Migrations;
using System.Reflection;

#nullable disable

namespace ICollector.Server.Migrations.ApplicationDB
{
    /// <inheritdoc />
    public partial class AddFullTextSearchToApplicationDB : Migration
    {
        private const string UP_QUERY_NAME = "20231124113829_UpFullTextSearch.sql";
        private const string DOWN_QUERY_NAME = "20231124113829_DownFullTextSearch.sql";

        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = typeof(AddFullTextSearchToApplicationDB).Namespace + "." + UP_QUERY_NAME;

            using var stream = assembly.GetManifestResourceStream(resourceName);
            using var reader = new StreamReader(stream);
            
            string sqlQuery = reader.ReadToEnd();
            migrationBuilder.Sql(sqlQuery);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = typeof(AddFullTextSearchToApplicationDB).Namespace + "." + DOWN_QUERY_NAME;

            using var stream = assembly.GetManifestResourceStream(resourceName);
            using var reader = new StreamReader(stream);

            string sqlQuery = reader.ReadToEnd();
            migrationBuilder.Sql(sqlQuery);
        }
    }
}
