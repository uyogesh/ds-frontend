const CardType = [
  { id: 0, label: 'All', icon: '', alias: '' },
  { id: 1, label: 'Courses', icon: 'graduation', alias: 'fas fa-graduation-cap' },
  { id: 2, label: 'Assessment', icon: 'assessment', alias: 'fas fa-clipboard-list' },
  { id: 3, label: 'Activity', icon: 'activity', alias: 'fas fa-walking' },
  { id: 4, label: '', icon: '', alias: '' },
  { id: 5, label: 'Quiz', icon: 'quiz', alias: 'fas fa-question' },
  { id: 6, label: 'Survey', icon: '', alias: '' },
  { id: 7, label: 'Video', icon: 'video', alias: 'far fa-video' },
  { id: 8, label: '', icon: '', alias: '' },
  { id: 9, label: '', icon: '', alias: '' },
  { id: 10, label: '', icon: '', alias: '' },
  { id: 11, label: '', icon: '', alias: '' },
  { id: 12, label: '', icon: '', alias: '' },
  { id: 13, label: '', icon: '', alias: '' },
  { id: 14, label: 'Study', icon: 'learn', alias: 'fal fa-book-open' },
]

const assignType = [
  { id: 0, label: 'All', name: 'all' },
  { id: 1, label: 'Career Assigned', name: 'career' },
  { id: 2, label: 'Manager Assigned', name: 'manager' },
  { id: 3, label: 'Self Assigned', name: 'self' },
]

const fileType = {
  'application/json': {
    label: 'Json file',
    icon: 'JSON',
    alias: 'fas fa-file',
  },
  'image/png': {
    label: 'PNG file',
    icon: 'PNG',
    alias: 'fas fa-file-image',
  },
  'image/jpeg': {
    label: 'JPG file',
    icon: 'JPG',
    alias: 'fas fa-file-image',
  },
  'application/pdf': {
    label: 'PDF file',
    icon: 'PDF',
    alias: 'fas fa-file-pdf',
  },
  'text/xml': {
    label: 'XML file',
    icon: 'XML',
    alias: 'fas fa-file',
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    label: 'WORD file',
    icon: 'WORD',
    alias: 'fas fa-file-word',
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    label: 'Excel file',
    icon: 'EXCEL',
    alias: 'fas fa-file-excel',
  },
  'application/msword': {
    label: 'WORD file',
    icon: 'WORD',
    alias: 'fas fa-file-word',
  },
  'application/vnd.ms-excel': {
    label: 'Excel file',
    icon: 'EXCEL',
    alias: 'fas fa-file-excel',
  },
  'application/zip': {
    label: 'Zip file',
    icon: 'Archive',
    alias: 'fas fa-file-archive',
  },
  'video/mp4': {
    label: 'MP4 file',
    icon: 'Video',
    alias: 'fas fa-file-video',
  },
  'video/x-msvideo': {
    label: 'AVI file',
    icon: 'Video',
    alias: 'fas fa-file-video',
  },
  'video/quicktime': {
    label: 'MOV file',
    icon: 'Video',
    alias: 'fas fa-file-video',
  },
  'video/x-ms-wmv': {
    label: 'WMV file',
    icon: 'Video',
    alias: 'fas fa-file-video',
  },
  'audio/mp3': {
    label: 'MP3 file',
    icon: 'Audio',
    alias: 'fas fa-file-audio',
  },
}

const CardStatus = ['not started', 'started', 'past due', 'completed', 'manager approval']

const assetsURL = 'http://hcm.drivingsales.com-assets.s3-us-west-2.amazonaws.com/'

export { CardType, assetsURL, CardStatus, fileType, assignType }
