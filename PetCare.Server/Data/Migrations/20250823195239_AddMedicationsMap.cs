using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetCare.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMedicationsMap : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicationLog_Medication_MedicationId",
                table: "MedicationLog");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Medication",
                table: "Medication");

            migrationBuilder.RenameTable(
                name: "Medication",
                newName: "Medications");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Medications",
                table: "Medications",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicationLog_Medications_MedicationId",
                table: "MedicationLog",
                column: "MedicationId",
                principalTable: "Medications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicationLog_Medications_MedicationId",
                table: "MedicationLog");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Medications",
                table: "Medications");

            migrationBuilder.RenameTable(
                name: "Medications",
                newName: "Medication");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Medication",
                table: "Medication",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicationLog_Medication_MedicationId",
                table: "MedicationLog",
                column: "MedicationId",
                principalTable: "Medication",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
