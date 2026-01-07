export interface SignatureData {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
}

export function generateSignatureHTML(data: SignatureData): string {
  return '<div style="font-family: Arial, sans-serif; padding: 20px; border-left: 4px solid #4F46E5;">' +
    '<div style="font-size: 18px; font-weight: bold;">' + data.name + '</div>' +
    '<div style="color: #666; margin-top: 4px;">' + data.title + '</div>' +
    '<div style="color: #666;">' + data.company + '</div>' +
    '<div style="margin-top: 12px;">' +
    '<div><a href="mailto:' + data.email + '" style="color: #4F46E5;">' + data.email + '</a></div>' +
    (data.phone ? '<div style="margin-top: 4px;">' + data.phone + '</div>' : '') +
    (data.website ? '<div style="margin-top: 4px;"><a href="' + data.website + '" style="color: #4F46E5;">' + data.website + '</a></div>' : '') +
    '</div></div>'
}
