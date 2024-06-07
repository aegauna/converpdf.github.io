// Esta función se llama cuando se arrastra un archivo sobre el div
function dragOverHandler(ev) {
    ev.preventDefault();
  }
  
  // Esta función se llama cuando se suelta un archivo sobre el div
  function dropHandler(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      // Usa la interfaz DataTransferItemList para acceder al archivo(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // Si los elementos arrastrados no son archivos, rechaza ellos
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          convertImageToPDF(file);
        }
      }
    }
  }
  
  // Esta función convierte la imagen arrastrada a PDF
  function convertImageToPDF(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        var doc = new jsPDF('p', 'mm', 'a4');
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(event.target.result, 'JPEG', 0, 0, width, height);
        doc.save('image.pdf');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
//-----------------------------------------------------------------------------------
document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
      // Aquí puedes llamar a la función que convierte la imagen a PDF
      convertImageToPDF(file);
    }
  });
  
  // Función para convertir la imagen a PDF usando jsPDF
  function convertImageToPDF(file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var img = new Image();
      img.onload = function() {
        // Crear un nuevo documento PDF
        var doc = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4'
        });
        
        // Calcular el ancho y alto para mantener la proporción de la imagen
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        var ratio = Math.min(width / img.width, height / img.height);
        var newWidth = img.width * ratio;
        var newHeight = img.height * ratio;
        
        // Añadir la imagen al documento
        doc.addImage(event.target.result, 'JPEG', 0, 0, newWidth, newHeight);
        
        // Guardar el PDF
        doc.save('imagen-convertida.pdf');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }