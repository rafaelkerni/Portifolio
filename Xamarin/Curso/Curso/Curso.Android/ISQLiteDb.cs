using SQLite;

namespace Curso.Droid
{
    public interface ISQLiteDb
    {
        SQLiteAsyncConnection GetConnection();
    }
}

