import  sqlite3  from  'sqlite3' 
import  { open }  from  'sqlite'

// você teria que importar/invocar isso em outro arquivo 
export async function openDb () {
  return open ({
    filename : './database.db',
    driver : sqlite3.Database 
  })
}   
   //  "type":"module"
