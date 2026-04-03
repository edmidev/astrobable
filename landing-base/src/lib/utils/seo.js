export function generateOrganizationSchema(empresa) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness", // or Organization based on type
    "name": empresa.nombre,
    "image": empresa.logo,
    "description": empresa.descripcion,
    "telephone": empresa.contacto?.telefono || "",
    "email": empresa.contacto?.email || "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": empresa.contacto?.direccion || "",
      "addressLocality": empresa.contacto?.ciudad || "",
      "addressCountry": empresa.contacto?.pais || ""
    }
  });
}
