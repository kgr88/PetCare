using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetCare.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddAnimalImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Animals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Animals");
        }
    }
}
