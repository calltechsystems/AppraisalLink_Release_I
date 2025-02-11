using System.ComponentModel;

namespace DAL.Classes
{
    public partial class MySetting : Component
    {
        public MySetting()
        {
            InitializeComponent();
        }

        public MySetting(IContainer container)
        {
            container.Add(this);

            InitializeComponent();
        }
    }
}
