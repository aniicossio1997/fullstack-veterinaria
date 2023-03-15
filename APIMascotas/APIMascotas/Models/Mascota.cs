using System.ComponentModel.DataAnnotations;

namespace APIMascotas.Models
{
    public class Mascota
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Raza { get; set; }=string.Empty;
        public string Color { get; set; } = string.Empty;
        public int Edad { get; set; }
        public float Peso { get; set; }
        public DateTime DateAt{ get; set; }
    }
}
