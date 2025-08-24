using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetCare.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMedicationLogs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicationLog_Medications_MedicationId",
                table: "MedicationLog");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicationLog",
                table: "MedicationLog");

            migrationBuilder.RenameTable(
                name: "MedicationLog",
                newName: "MedicationLogs");

            migrationBuilder.RenameIndex(
                name: "IX_MedicationLog_MedicationId",
                table: "MedicationLogs",
                newName: "IX_MedicationLogs_MedicationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicationLogs",
                table: "MedicationLogs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicationLogs_Medications_MedicationId",
                table: "MedicationLogs",
                column: "MedicationId",
                principalTable: "Medications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MedicationLogs_Medications_MedicationId",
                table: "MedicationLogs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MedicationLogs",
                table: "MedicationLogs");

            migrationBuilder.RenameTable(
                name: "MedicationLogs",
                newName: "MedicationLog");

            migrationBuilder.RenameIndex(
                name: "IX_MedicationLogs_MedicationId",
                table: "MedicationLog",
                newName: "IX_MedicationLog_MedicationId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MedicationLog",
                table: "MedicationLog",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MedicationLog_Medications_MedicationId",
                table: "MedicationLog",
                column: "MedicationId",
                principalTable: "Medications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
