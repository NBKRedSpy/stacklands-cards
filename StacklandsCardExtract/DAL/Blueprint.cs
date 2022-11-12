using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StacklandsCardExtract.DAL
{
    public class Blueprint
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public List<BlueprintResource> Resources { get; set; }

        public string ColorHeader { get; set; }
        public string ColorBody { get; set; }

    }

}
