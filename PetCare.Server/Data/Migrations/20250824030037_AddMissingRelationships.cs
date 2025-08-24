using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetCare.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMissingRelationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Medications_AnimalId",
                table: "Medications",
                column: "AnimalId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_AnimalId",
                table: "Appointments",
                column: "AnimalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Animals_AnimalId",
                table: "Appointments",
                column: "AnimalId",
                principalTable: "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Medications_Animals_AnimalId",
                table: "Medications",
                column: "AnimalId",
                principalTable: "Animals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Animals_AnimalId",
                table: "Appointments");

            migrationBuilder.DropForeignKey(
                name: "FK_Medications_Animals_AnimalId",
                table: "Medications");

            migrationBuilder.DropIndex(
                name: "IX_Medications_AnimalId",
                table: "Medications");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_AnimalId",
                table: "Appointments");
        }
    }
}
