using SQLite;

namespace Curso
{
    public interface ISQLiteDb
    {
        SQLiteAsyncConnection GetConnection();
    }
}

