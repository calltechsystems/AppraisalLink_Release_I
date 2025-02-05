using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
