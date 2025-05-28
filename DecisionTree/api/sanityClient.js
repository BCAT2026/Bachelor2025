import { createClient } from '@sanity/client';


const client = createClient({
  projectId: 'f5fg02cy',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: 'skrWN5IRi6rRR1YPUUQCRqvNIqOzgdTq7tDOl8D4BWlaid1b6GrOlCwVnvqC7Bf6GZoUyBcNrG341HIqLlscDevdQ0clpxxs5ARdFtMAH66HIzRI52EmrVRC1sJavdqdWYg5rR2pSyXLZqGTsomDwqzj2yUPNzArirDm9uhpyUMOsXOuCSGh',       // sett inn token her
  useCdn: false,
})

export default client
