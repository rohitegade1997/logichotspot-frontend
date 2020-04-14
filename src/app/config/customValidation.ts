export var validation = {
  'mac': '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$',
  'attempt': '^[1-9][0-9]*$',
  'OnlyAlphabetsReg': '^[a-zA-Z ]*$',
  'url': '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
  'AllReg': '[a-zA-Z0-9_]+.*$',
  'zip': '^\\d{5}-\\d{4}|\\d{5}|[A-Z]\\d[A-Z] \\d[A-Z]\\d$',
  'OnlyNumbersReg': '^[0-9]*$',
  'name': '^[a-zA-Z0-9 ]*$',
  'phone': '^([\+][0-9]{1,3}([ \.\-])?)?([\(]{1}[0-9]{3}[\)])?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)$'
}